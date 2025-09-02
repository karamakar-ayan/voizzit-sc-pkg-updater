// aptRunner.js
const { spawn, exec } = require("child_process");
const { PKGS, PACKAGE_MAP, DEPENDENCIES } = require("./constant");
const logger = require("./logger");

function expandDependencies(selectedPkgs) {
  const result = new Set(selectedPkgs);
  selectedPkgs.forEach((pkg) => {
    if (DEPENDENCIES[pkg]) {
      DEPENDENCIES[pkg].forEach((dep) => result.add(dep));
    }
  });
  return Array.from(result);
}

async function updatePackages(pkgs) {
  return new Promise((resolve, reject) => {
    const expanded = expandDependencies(pkgs);

    // Handle self-update separately
    if (expanded.includes(PKGS.PKG_UPDATER)) {
      const updaterPkg = PACKAGE_MAP[PKGS.PKG_UPDATER];
      logger.log(`Self-update detected for ${updaterPkg}`);

      // Spawn detached child to update
      const child = spawn("bash", ["-c", `
        sleep 2 &&
        sudo apt-get update -y &&
        sudo apt-get install -y ${updaterPkg}
      `], {
        detached: true,
        stdio: "ignore"
      });

      child.unref();

      // Resolve immediately, API call returns success
      return resolve(`Self-update scheduled for ${updaterPkg}`);
    }

    // Normal update flow
    let commands = ["sudo apt-get update -y"];
    if (expanded.includes(PKGS.ALL)) {
      commands.push(`sudo apt-get install -y ${Object.values(PACKAGE_MAP).join(" ")}`);
    } else {
      const packagesToInstall = expanded.map((p) => PACKAGE_MAP[p]).filter(Boolean);
      if (packagesToInstall.length > 0) {
        commands.push(`sudo apt-get install -y ${packagesToInstall.join(" ")}`);
      }
    }

    const finalCmd = commands.join(" && ");
    logger.log("Executing:", finalCmd);

    exec(finalCmd, (err, stdout, stderr) => {
      if (err) {
        return reject({ message: stderr || err.message });
      }
      resolve(stdout);
    });
  });
}

module.exports = { updatePackages };