// enums.js
const PKGS = {
    ALL: 0,
    FRONT_END: 1,
    REST_API: 2,
    PGM: 3,
    JANUS: 4,
    HLS_VIEWER: 5,
    RTP_VIEWER: 6,
    PKG_UPDATER: 7,
    ONE_MF: 8,
};
  
const PACKAGE_MAP = {
    [PKGS.FRONT_END]: "voizzit-sc-frontend",
    [PKGS.REST_API]: "voizzit-sc-restapi",
    [PKGS.PGM]: "voizzit-sc-pgm",
    [PKGS.JANUS]: "voizzit-sc-janus",
    [PKGS.HLS_VIEWER]: "voizzit-sc-hls-viewer",
    [PKGS.RTP_VIEWER]: "voizzit-sc-rtp-viewer",
    [PKGS.PKG_UPDATER]: "voizzit-sc-pkg-updater",
    [PKGS.ONE_MF]: "voizzit-sc-onemf",
};
  
// dependency rules
const DEPENDENCIES = {
  [PKGS.ONE_MF]: [PKGS.PGM], // whenever ONE_MF updates, also update PGM
};

module.exports = { PKGS, PACKAGE_MAP, DEPENDENCIES };  