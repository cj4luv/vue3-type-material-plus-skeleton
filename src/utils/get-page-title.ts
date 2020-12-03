import defaultSettings from '@config/settings';

const title = defaultSettings.title || 'Vue Element Admin';

export default function getPageTitle(pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
