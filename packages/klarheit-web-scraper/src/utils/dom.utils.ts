const logger = console;

const qsFnFrom = (qsFn: 'querySelector' | 'querySelectorAll') =>
  (root: Document | HTMLElement = document) => (selector: string) => {
    try {
      const result = root[qsFn].call(root, selector);
      return qsFn === 'querySelectorAll' ? Array.from(result) : result;
    } catch (e) {
      logger.error(e);
      return undefined;
    }
  };
export const qsFrom = qsFnFrom('querySelector');
export const qsaFrom = qsFnFrom('querySelectorAll');
export const qs = qsFrom();
export const qsa = qsaFrom();
