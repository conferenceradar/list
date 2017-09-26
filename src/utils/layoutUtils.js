import settings from '../settings';

export const isMobileish = () => {
  return window.innerWidth < settings.mobileWidth;
}
