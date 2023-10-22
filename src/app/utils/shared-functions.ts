import { ApplicationMenu } from '../models/application';

export function transformHtmlToPlainText(html: string): string {
  if (!html) {
    return '';
  }

  return html
    .replace('<br>', ' ')
    .replace('\n', ' ')
    .replace('&nbsp;', ' ')
    .replace(/<[^>]+>/gm, '')
    .trim();
}

export function buildMenuTree(menus: ApplicationMenu[]): ApplicationMenu[] {
  // 1. Obtiene los menu padres
  const parents = [...menus.filter(it => it.parentId === 0)];

  parents.forEach(parent => {

    const children = menus.filter(it => it.parentId === parent.id);

    parent.children = [...children];

  });

  return parents;
}

export function round(value: number): number {
  return Math.round(100 * value) / 100; // <----------
}
