import { Component, Input, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { tree, hierarchy } from 'd3-hierarchy';
// import { linkVertical } from 'd3-shape';
import { select } from 'd3-selection';
import { Device, Link } from '../../core/models/device';

const d3Tree = tree();

interface TreeNode {
  name: string;
  id: string;
  type: string;
  path?: string;
  children?: TreeNode[]
}

@Component({
  selector: 'tree-topo',
  templateUrl: './treeTopo.component.html',
  styleUrls: ['./topo.component.scss']
})
export class TreeTopoComponent implements OnInit, OnDestroy {
  @Input('devices') devices: Device[];
  @Input('links') links: Link[];
  margin = {
    top: 20,
    left: 80,
    bottom: 20,
    right: 150
  }
  svgWidth: number;
  svgHeight: number;
  treeRootNode: TreeNode;

  constructor(private elmRef: ElementRef) { }

  ngOnInit(): void {
    this.initSvgArea();
    this.checkDataValid();
    this.buildTreeRootNode();
    console.log(this.treeRootNode);
    this.initTreeTopo();
  }
  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }

  initSvgArea() {
    this.svgWidth = this.elmRef.nativeElement.offsetWidth - this.margin.left - this.margin.right;
    this.svgHeight = this.elmRef.nativeElement.offsetHeight - this.margin.top - this.margin.bottom;
  }

  initTreeTopo(): void {
    const treeMap = d3Tree
      .size([this.svgHeight, this.svgWidth]);
    let nodes = hierarchy(this.treeRootNode, d => d.children);
    nodes = treeMap(nodes);

    select('g.tree-container').remove();
    const svg = select('svg#tree-root')
      .append("g")
      .attr("class", "tree-container")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");

    const link = svg
      .selectAll(".link")
      .data(nodes.descendants().slice(1))
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#10729b")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5)
      .attr("d", d => {
        return "M" + d.y + "," + d.x
          + "C" + (d.y + d.parent.y) / 2 + "," + d.x
          + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
          + " " + d.parent.y + "," + d.parent.x;
      });

    const node = svg
      .selectAll('.node')
      .data(nodes.descendants())
      .join("g")
      .attr("class", d => "node" + (d.children ? " node-internal"
        : " node-leaf"))
      .attr("transform", d => "translate(" + d.y + "," +
        d.x + ")");

    node.append("use")
      .attr("xlink:href", '#switch')
      .attr('x', -24)
      .attr('y', -20)
      .attr('fill', d => d.data.type === 'router' ? '#1d4c7a' : '#4081a9');

    node.append("text")
      .attr("class", "device-name")
      .attr('y', 24)
      .style("text-anchor", 'middle')
      .text(d => d.data.name);
  }

  resize(event: Event) {
    this.initSvgArea();
    this.initTreeTopo();
  }

  checkDataValid(): void {
    //root node(join sw) and child node(ovn_cluster_router) is necessary
    let existJoinSw: boolean = false;
    let existClusterRouter: boolean = false;

    this.links.forEach((link) => {
      if ((link.srcDeviceName.toLowerCase() === 'join' ||
        link.dstDeviceName.toLowerCase() === 'join') &&
        !existJoinSw) {
        const sw = this.devices.find((item) => item.name.toLowerCase() === 'join');
        if (sw) {
          existJoinSw = true;
        }
      }
      if ((link.srcDeviceName.toLowerCase() === 'ovn_cluster_router' ||
        link.dstDeviceName.toLowerCase() === 'ovn_cluster_router') &&
        !existClusterRouter) {
        const router = this.devices.find((item) => item.name.toLowerCase() === 'ovn_cluster_router');
        if (router) {
          existClusterRouter = true;
        }
      }
    });

    if (!(existJoinSw && existClusterRouter)) {
      select('svg#tree-root')
        .append('text')
        .text('Topology 链路数据异常')
        .attr('dx', (this.svgWidth / 2 - 70) + 'px')
        .attr('dy', '50%');
      return;
    }
  }

  buildTreeRootNode(): void {
    let swNodeUpdate = false;
    let routerNodeUpdate = false;
    const joinSwitchNode: TreeNode = {
      name: 'join',
      id: '',
      type: 'switch',
      children: []
    };
    const ovnClusterRouterNode: TreeNode = {
      name: 'ovn_cluster_router',
      id: '',
      type: 'router',
      children: []
    };
    const joinExp = /^join$/i;
    const ovnClusterRouterExp = /^ovn_cluster_router$/i;
    const coreExp = /^(join|ovn_cluster_router|GR_.+|ext_.+)$/i;
    const grExp = /^GR_([\w\-\_]+)/;
    const extExp = /^ext_([\w\-\_]+)/;
    const gatewaySet = new Set();
    const extSet = new Set();
    const nodeSet = new Set();
    const nodeMap = new Map<string, object>();

    this.links.forEach((link) => {
      if (joinExp.test(link.srcDeviceName) && !swNodeUpdate) {
        joinSwitchNode.name = link.srcDeviceName;
        joinSwitchNode.id = link.srcDeviceId;
        swNodeUpdate = true;
      } else if (joinExp.test(link.dstDeviceName) && !swNodeUpdate) {
        joinSwitchNode.name = link.dstDeviceName;
        joinSwitchNode.id = link.dstDeviceId;
        swNodeUpdate = true;
      }
      if (ovnClusterRouterExp.test(link.srcDeviceName) && !routerNodeUpdate) {
        ovnClusterRouterNode.name = link.srcDeviceName;
        ovnClusterRouterNode.id = link.srcDeviceId;
        routerNodeUpdate = true;
      } else if (ovnClusterRouterExp.test(link.dstDeviceName) && !routerNodeUpdate) {
        ovnClusterRouterNode.name = link.dstDeviceName;
        ovnClusterRouterNode.id = link.dstDeviceId;
        routerNodeUpdate = true;
      }
      //gateway router
      let regexResult;
      if ((regexResult = grExp.exec(link.srcDeviceName)) !== null &&
        (!gatewaySet.has(regexResult[1]))) {
        const gatewayNode: TreeNode = {
          name: link.srcDeviceName,
          id: link.srcDeviceId,
          type: 'router',
          path: regexResult[1],
          children: []
        };
        joinSwitchNode.children.push(gatewayNode);
        const mapVal = nodeMap.get(regexResult[1]);
        if (!mapVal) {
          nodeMap.set(regexResult[1], {
            'gateway':
              { id: link.srcDeviceId, name: link.srcDeviceName }
          });
        } else {
          mapVal['gateway'] = { id: link.srcDeviceId, name: link.srcDeviceName };
        }
        gatewaySet.add(regexResult[1]);
      } else if ((regexResult = grExp.exec(link.dstDeviceName)) !== null &&
        (!gatewaySet.has(regexResult[1]))) {
        const gatewayNode: TreeNode = {
          name: link.dstDeviceName,
          id: link.dstDeviceId,
          type: 'router',
          path: regexResult[1],
          children: []
        };
        joinSwitchNode.children.push(gatewayNode);
        const mapVal = nodeMap.get(regexResult[1]);
        if (!mapVal) {
          nodeMap.set(regexResult[1], {
            'gateway':
              { id: link.dstDeviceId, name: link.dstDeviceName }
          });
        } else {
          mapVal['gateway'] = { id: link.dstDeviceId, name: link.dstDeviceName };
        }
        gatewaySet.add(regexResult[1]);
      }
      //external switch
      if ((regexResult = extExp.exec(link.srcDeviceName)) !== null &&
        (!extSet.has(regexResult[1]))) {
        const mapVal = nodeMap.get(regexResult[1]);
        if (!mapVal) {
          nodeMap.set(regexResult[1], {
            'external':
              { id: link.srcDeviceId, name: link.srcDeviceName }
          });
        } else {
          mapVal['external'] = { id: link.srcDeviceId, name: link.srcDeviceName };
        }
        extSet.add(regexResult[1]);
      } else if ((regexResult = extExp.exec(link.dstDeviceName)) !== null &&
        (!extSet.has(regexResult[1]))) {
        const mapVal = nodeMap.get(regexResult[1]);
        if (!mapVal) {
          nodeMap.set(regexResult[1], {
            'external':
              { id: link.dstDeviceId, name: link.dstDeviceName }
          });
        } else {
          mapVal['external'] = { id: link.dstDeviceId, name: link.dstDeviceName };
        }
        extSet.add(regexResult[1]);
      }
      //node switch
      if (coreExp.test(link.srcDeviceName) === false &&
        !nodeSet.has(link.srcDeviceName)) {
        const node: TreeNode = {
          name: link.srcDeviceName,
          id: link.srcDeviceId,
          type: 'switch',
          path: link.srcDeviceName
        };
        ovnClusterRouterNode.children.push(node);
        nodeSet.add(link.srcDeviceName);
      } else if (coreExp.test(link.dstDeviceName) === false &&
        !nodeSet.has(link.dstDeviceName)) {
        const node: TreeNode = {
          name: link.dstDeviceName,
          id: link.dstDeviceId,
          type: 'switch',
          path: link.dstDeviceName
        };
        ovnClusterRouterNode.children.push(node);
        nodeSet.add(link.dstDeviceName);
      }
    });
    joinSwitchNode.children.forEach((grNode) => {
      const mapVal = nodeMap.get(grNode.path);
      if (mapVal && mapVal['external']) {
        const externalNode: TreeNode = {
          id: mapVal['external']['id'],
          name: mapVal['external']['name'],
          type: 'switch',
          path: grNode.path
        };
        grNode.children.push(externalNode);
      }
    });
    joinSwitchNode.children.push(ovnClusterRouterNode);
    this.treeRootNode = joinSwitchNode;
  }
}