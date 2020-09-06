const USE_LOCALHOST = true;
const PORT_FAKE_API = "3000";

export const defaultHosts = {
  localhost: `localhost:${PORT_FAKE_API}`,
  server: ``
};

export const baseUrl = USE_LOCALHOST ? `http://${defaultHosts.localhost}` :
                                       `https://${defaultHosts.server}`;