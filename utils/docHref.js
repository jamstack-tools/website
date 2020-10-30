export default function docHref(url) {
  if (url === '/browse/content-delivery-api/filtering-records') {
    return '/browse/content-delivery-api/filtering-records';
  }

  if (!url.startsWith('/browse/content-management-api')) {
    return '/browse/[...chunks]';
  }

  if (url.startsWith('/browse/content-management-api/resources/')) {
    if (url.match(/resources\/[^\/]+$/)) {
      return '/browse/content-management-api/resources/[resource]';
    } else {
      return '/browse/content-management-api/resources/[resource]/[endpoint]';
    }
  }

  if (url === '/browse/content-management-api') {
    return '/browse/content-management-api';
  }

  return '/browse/content-management-api/[...chunks]';
}
