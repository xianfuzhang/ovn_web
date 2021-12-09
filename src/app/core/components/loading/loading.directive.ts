import {
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { MatSpinner } from "@angular/material/progress-spinner";

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnInit {
  child: HTMLDivElement;

  @Input("appLoadingSize")
  size: number;

  @Input("appLoadingWidth")
  width: number;

  constructor(private element: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private render: Renderer2) {

  }
  ngOnInit(): void {
    if (!this.size) this.size = 50;
    if (!this.width) this.width = 5;
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(MatSpinner);
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.strokeWidth = this.width;
    componentRef.instance.diameter = this.size;

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    this.element.nativeElement.style.position = 'relative';
    this.child = document.createElement('div');
    this.child.className = 'loader_wrapper';

    domElem.setAttribute("strokeWidth", "2px")
    this.render.appendChild(this.child, domElem);
    this.render.appendChild(this.element.nativeElement, this.child);
  }
}