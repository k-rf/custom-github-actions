import { actBoolean, actNumber, actString } from "./act";
import { DefineAction, ParsedInput } from "./types";

export const defineAction: DefineAction = {
  actionMeta: (actionMeta) => ({
    inputs: (inputDefinitionFn) => ({
      parse: () => {
        const act = inputDefinitionFn({
          string: actString,
          number: actNumber,
          boolean: actBoolean,
        });

        // TODO: `input` や `meta` を呼び出すたびにループが回るのでキャッシュする
        return {
          get inputs() {
            return Object.entries(act)
              .map(([key, value]) => ({
                [key]: value.parse(key).getInput(),
              }))
              .reduce<ParsedInput<typeof act>>(
                (p, c) => ({ ...p, ...c }),
                {} as ParsedInput<typeof act>
              );
          },
          meta: {
            action: actionMeta,
            inputs: Object.entries(act).map(([key, value]) => value.parse(key)),
          },
        };
      },
    }),
  }),
};
