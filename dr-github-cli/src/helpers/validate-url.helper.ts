export const validateUrl = (url: string): boolean => {
  const urlPattern = new RegExp(
    "^((https?|ftp)://)?" + // protocol
      "(([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)?" + // authentication
      "(([0-9]{1,3}.){3}[0-9]{1,3}|" + // OR IP address (IPv4)
      "([a-zA-Z0-9-]+.)+[a-zA-Z]{2,})" + // OR domain name
      "(:[0-9]{1,5})?)" + // port
      "(/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$" // path
  );

  return urlPattern.test(url);
};
