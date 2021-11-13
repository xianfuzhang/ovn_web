import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RegexService {
	private regMap = new Map();

	constructor() {
    this.regMap.set('name_en_15', /^[A-Za-z\d_-]{1,15}$/);
    this.regMap.set('ipv4', /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))*$/);
    this.regMap.set('ip_mask', /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/\d{1,2})*$/);
    this.regMap.set('ip_mask_26', /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/26)*$/);
    this.regMap.set('ip_mask_32', /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/32)*$/);
    this.regMap.set('ip_or_mask', /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/\d{1,2})*)*$/);
    this.regMap.set('ip_prefix', /^([0-2]\d?|3[0-2])$/); //0-32
    this.regMap.set('mac', /^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}|([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}$/);
    this.regMap.set('port', /^\d+$/); //sonic port 0
    this.regMap.set('multi_ports', /^([1-9]\d*,|[1-9]\d*-[1-9]\d*,)*([1-9]\d*|[1-9]\d*-[1-9]\d*)$/); //1,3,10-15
    this.regMap.set('port_mtu', /^(151[8-9]|15[2-9]\d|1[6-9]\d{2}|[2-8]\d{3}|9[0-3]\d{2}|940[0-4])$/); //1518-9404
    this.regMap.set('tcp_port', /^(\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/); //0-65535
    this.regMap.set('tacacs_tcp_port', /^([1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/); //1-65535
    this.regMap.set('tacacs_transmit', /^[1-5]$/); //1-5
    this.regMap.set('tacacs_timeout', /^([1-9]|10)$/); //1-10
    this.regMap.set('tacacs_key', /^[A-Za-z]{1,48}$/); //1-48
    this.regMap.set('logical_port_group', /^([1-9]|1\d|2[0-7])$/); // 1-27
    this.regMap.set('vlan_2_to_4096', /^([2-9]|[1-9]\d{1,2}|[1-3]\d{3}|40[0-8]\d|409[0-6])$/); // 2-4096
    this.regMap.set('vlan_1_to_4096', /^([1-9]\d{0,2}|[1-3]\d{3}|40[0-8]\d|409[0-6])$/); // 1-4096
    this.regMap.set('vlan_1_to_4094', /^([1-9]\d{0,2}|[1-3]\d{3}|40[0-8]\d|409[0-4])$/); // 1-4094
    this.regMap.set('vlan_0_to_4094', /^(\d{1,3}|[1-3]\d{3}|40[0-8]\d|409[0-4])$/); // 0-4094
    this.regMap.set('vlan_0_to_4095', /^(\d{1,3}|[1-3]\d{3}|40[0-8]\d|409[0-5])$/); // 0-4095
    this.regMap.set('vlan_1_to_4094_mask', /^([1-9]\d{0,2}|[1-3]\d{3}|40[0-8]\d|409[0-4])(\/\d+)*$/); // 1-4094/122
    this.regMap.set('poe_threshold', /^([1-9]|[1-9]\d)$/); // 1~99
    this.regMap.set('poe_max_power', /^([3-9]\d{3}|[1-2]\d{4}|30000)$/); //3000~30000
    this.regMap.set('sfp_monitor_cycle', /^([1-9]\d|1[0-7]\d|180)$/); // 10~180
    this.regMap.set('sfp_touch_count', /^([5-9]|1\d|20)$/); // 5~20
    this.regMap.set('sfp_monitor_temp', /^(\d{1,2}|1[0-1]\d|12[0-8]|-\d{1,2}|-1[0-1]\d|-12[0-8])$/); //-128~128
    this.regMap.set('sfp_monitor_voltage', /^([0-6]|[1-5]\.\d{1,2}|6\.[0-4]\d{0,1}|6\.5[0-5]{0,1})$/); //0~6.55
    this.regMap.set('sfp_monitor_current', /^(\d{1,2}|1[0-2]\d|13[0-1])$/); //0~131
    this.regMap.set('sfp_monitor_power', /^([0-8]|[1-7]\.\d|8\.[0-2]|-[1-9]|-[1-3]\d|-40|-[1-9]\.\d|-[1-3]\d\.\d)$/); // -40 ~ 8.2
    this.regMap.set('number', /^[0-9]+$/);
    this.regMap.set('hour', /^(\d|1\d|2[0-3])$/); //0~23
    this.regMap.set('minute', /^(\d|[1-5]\d)$/); //0~59
    this.regMap.set('qos_dscp', /^(\d|[1-5]\d|6[0-3])$/); //0~63
    this.regMap.set('qos_threshold', /^([1-9]\d{0,1}|100)$/); //1~100
    this.regMap.set('qos_weight', /^(\d|1[0-5])$/); //0~15
    this.regMap.set('qos_rate_limit', /^([1-9]\d{0,2}|1000)$/); //1~1000
    this.regMap.set('qos_vlan_rate_limit', /^(\d{1,8}|100000000)$/); //0~100000000
    this.regMap.set('qos_pfc_multi_queue', /^([0-7],)*[0-7]$/); // 0,1,5,7
    this.regMap.set('qos_policy_cos', /^[0-7]$/); //0~7
    this.regMap.set('dai_rate_limit', /^(\d|[1-9]\d|[1-6]\d{2}|7[0-4]\d|750)$/); //0~750
    this.regMap.set('dai_log_number', /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-6])$/); //0~256
    this.regMap.set('dai_log_interval', /^(\d|[1-9]\d{1,3}|[1-7]\d{4}|8[0-5]\d{3}|86[0-3]\d{2}|86400)$/); //0~86400
    this.regMap.set('qos_policy_multi_vlan', /^(([1-9]\d{0,2}|[1-3]\d{3}|40[0-8]\d|409[0-4]),)*([1-9]\d{0,2}|[1-3]\d{3}|40[0-8]\d|409[0-4])$/); //1~4094 1,2,3
    this.regMap.set('qos_policy_multi_dscp', /^((\d|[1-5]\d|6[0-3]),)*(\d|[1-5]\d|6[0-3])$/);  //0~63 0,1,2
    this.regMap.set('qos_policy_cir', /^(\d{1,7}|[1-3]\d{7}|40000000)$/); //0~40000000
    this.regMap.set('qos_policy_bc', /^([1-9]\d{3,7}|1[0-1]\d{7}|12[0-7]\d{6})$/); //1000-128000000
    this.regMap.set('qos_multi_port', /^([1-9]\d{0,2},)*[1-9]\d{0,2}$/); //1,2,3
    this.regMap.set('egp_ip_proto', /^(\d{1,2}|1\d{2}|2[0-4]\d|25[0-5])$/); // 0~255
    this.regMap.set('segment_mac_mask', /^(\d|[1-3]\d|4[0-8])$/); //0~48
    this.regMap.set('acl_ether_type', /^([a-fA-F0-9]){1,4}$/); //0-ffff
    this.regMap.set('storm_flow_control', /^(\d|[1-9]\d{1,6}|1\d{7}|2[0-3]\d{6}|24[0-3]\d{5}|2440\d{4}|2441[0-3]\d{3}|244140[0-5]\d|2441406[0-2])$/); //0-24414062
    this.regMap.set('sflow_max_header', /^(6[4-9]|[7-9]\d|1\d{2}|2[0-4]\d|25[0-6])$/); //64~256
    this.regMap.set('sflow_max_payload', /^([2-9]\d{2}|1[0-4]\d{2}|1500)$/); //200~1500
    this.regMap.set('sflow_rate', /^(25[6-9]|2[6-9]\d|[3-9]\d{2}|[1-9]\d{4,6}|1[0-5]\d{6}|16[0-6]\d{5}|167[0-6]\d{4}|1677[0-6]\d{3}|16777[0-1]\d{2}|1677720\d|1677721[0-5])$/); //256~16777215
    this.regMap.set('sflow_duration', /^([3-9]\d|[1-9]\d{2,6}|10000000)$/); //30~10000000
    this.regMap.set('lbd_interval', /^([1-9]\d{0,3}|[1-2]\d{4}|3[0-2]\d{3})$/); //1~32999
    this.regMap.set('lbd_recover', /^(0|[6-9]\d|\d{3,6}|1000000)$/); //0, 60~1000000
    this.regMap.set('bgp_asn', /^(6451[2-9]|645[2-9]\d|64[6-9]\d{2}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/); // 64512~65535
    this.regMap.set('email', /^([a-zA-Z0-9._]+)@([a-zA-Z0-9.]+)$/);
    this.regMap.set('string', /^[A-Za-z0-9_-]+$/);
    this.regMap.set('pod', /^\w{1,15}$/);
    this.regMap.set('flow_dump_range', /^(\d{1,2}|1\d{2}|2[0-4]\d|25[0-4])$/); // 0~254
    this.regMap.set('num_1_to_21', /^([1-9]|1\d|2[01])$/); // 1~21
    this.regMap.set('num_0_to_65535', /^(\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/); // 0~65535
    this.regMap.set('num_1_to_255', /^([1-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/); // 1~255
    this.regMap.set('hex_01_to_ff', /^[\da-f]{1}[1-9a-f]{1}|[1-9a-f]{1}[\da-f]{1}$/); // 01~ff
    this.regMap.set('isis_system_id', /^\d{4}\.\d{4}\.\d{4}$/); // xxxx.xxxx.xxxx, x=0~9
    this.regMap.set('isis_router_id', /^\d{4}\.\d{4}\.\d{4}\.\d{2}$/); // xxxx.xxxx.xxxx.xx, x=0~9
    this.regMap.set('isis_area_address', /^49\d{4}$/); // 49xxxx, x=0~9
	}

	get(type: string): RegExp {
		return this.regMap.get(type);
	}
}
