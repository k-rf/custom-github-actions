import { ActionMetaProps, metadata } from "../core";

export const ActionMeta = (props: ActionMetaProps) => {
  return <T>(_target: T) => {
    metadata.meta = props;
  };
};
