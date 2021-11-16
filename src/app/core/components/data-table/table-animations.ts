import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4, 0.0, 0.2, 1)';

export const TableAnimations: {
  readonly expendSwitch: AnimationTriggerMetadata;
  // readonly detailExpand: AnimationTriggerMetadata;
  readonly detailContent: AnimationTriggerMetadata;
  readonly actionExpand: AnimationTriggerMetadata;
} = {
  expendSwitch: trigger('expendSwitch', [
    state('collapsed', style({ transform: 'rotate(0deg)' })),
    state('expanded', style({ transform: 'rotate(180deg)' })),
    transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING))
  ]),
  // detailExpand: trigger('detailExpand', [
  //   state('collapsed', style({ height: 0, minHeight: 0, 'border-bottom-width': 0 })),
  //   state('expanded', style({ height: '*', 'border-bottom-width': 0 })),
  //   transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING))
  // ]),
  detailContent: trigger('detailContent', [
    state('collapsed, void', style({ height: 0  })),
    state('expanded', style({ height: '*' })),
    transition('expanded <=> collapsed, void => expanded', animate(EXPANSION_PANEL_ANIMATION_TIMING))
  ]),
  actionExpand: trigger('actionExpand', [
    state('collapsed', style({ height: 0  })),
    state('expanded', style({ height: '136px' })),
    transition('expanded <=> collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING))
  ])
};