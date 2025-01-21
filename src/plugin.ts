import type {LoadContext, Plugin} from '@docusaurus/types';
import type {PluginOptions} from './options';

export function pluginHubspotTackingCode(
  _context: LoadContext,
  options: PluginOptions,
): Plugin | null {
  
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return {
    name: 'docusaurus-plugin-hubspot',

    contentLoaded({actions}) {
      actions.setGlobalData(options);
    },

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              async: options.async,
              defer: options.defer,
              type: 'text/javascript',
              id: 'hs-script-loader',
              src: `//js.hs-scripts.com/${options.accountId}.js`,
            },
          }
        ]
      }
    }
  }
}
