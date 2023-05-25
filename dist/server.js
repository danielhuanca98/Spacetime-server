"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/dotenv/package.json"(exports, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.0.3",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          require: "./lib/main.js",
          types: "./lib/main.d.ts",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^17.0.9",
        decache: "^4.6.1",
        dtslint: "^3.7.0",
        sinon: "^12.0.1",
        standard: "^16.0.4",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.3.2",
        tap: "^15.1.6",
        tar: "^6.1.11",
        typescript: "^4.5.4"
      },
      engines: {
        node: ">=12"
      }
    };
  }
});

// node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/dotenv/lib/main.js"(exports, module2) {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _log(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function config(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        Object.keys(parsed).forEach(function(key) {
          if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
            process.env[key] = parsed[key];
          } else {
            if (override === true) {
              process.env[key] = parsed[key];
            }
            if (debug) {
              if (override === true) {
                _log(`"${key}" is already defined in \`process.env\` and WAS overwritten`);
              } else {
                _log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`);
              }
            }
          }
        });
        return { parsed };
      } catch (e) {
        if (debug) {
          _log(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    var DotenvModule = {
      config,
      parse
    };
    module2.exports.config = DotenvModule.config;
    module2.exports.parse = DotenvModule.parse;
    module2.exports = DotenvModule;
  }
});

// node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/dotenv/lib/env-options.js"(exports, module2) {
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    module2.exports = options;
  }
});

// node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/dotenv/lib/cli-options.js"(exports, module2) {
    var re = /^dotenv_config_(encoding|path|debug|override)=(.+)$/;
    module2.exports = function optionMatcher(args) {
      return args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
    };
  }
});

// node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));
var import_jwt = __toESM(require("@fastify/jwt"));
var import_multipart = __toESM(require("@fastify/multipart"));

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/memories.ts
var import_zod = require("zod");
async function memoriesRoutes(app2) {
  app2.addHook("preHandler", async (request) => {
    await request.jwtVerify();
  });
  app2.get("/memories", async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub
      },
      orderBy: {
        createdAt: "asc"
      }
    });
    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat("..."),
        createdAt: memory.createdAt
      };
    });
  });
  app2.get("/memories/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id
      }
    });
    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(401).send();
    }
    return memory;
  });
  app2.post("/memories", async (request) => {
    const bodySchema = import_zod.z.object({
      content: import_zod.z.string(),
      coverUrl: import_zod.z.string(),
      isPublic: import_zod.z.coerce.boolean().default(false)
    });
    const { content, isPublic, coverUrl } = bodySchema.parse(request.body);
    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub
      }
    });
    return memory;
  });
  app2.put("/memories/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const bodySchema = import_zod.z.object({
      content: import_zod.z.string(),
      coverUrl: import_zod.z.string(),
      isPublic: import_zod.z.coerce.boolean().default(false)
    });
    const { content, isPublic, coverUrl } = bodySchema.parse(request.body);
    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id
      }
    });
    if (memory.userId !== request.user.sub) {
      return reply.status(401).send();
    }
    memory = await prisma.memory.update({
      where: {
        id
      },
      data: {
        content,
        coverUrl,
        isPublic
      }
    });
    return memory;
  });
  app2.delete("/memories/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id
      }
    });
    if (memory.userId !== request.user.sub) {
      return reply.status(401).send();
    }
    await prisma.memory.delete({
      where: {
        id
      }
    });
  });
}

// src/routes/auth.ts
var import_axios = __toESM(require("axios"));
var import_zod2 = require("zod");
async function authRoutes(app2) {
  app2.post("/register", async (request) => {
    const bodyScheme = import_zod2.z.object({
      code: import_zod2.z.string()
    });
    const { code } = bodyScheme.parse(request.body);
    const accessTokenResponse = await import_axios.default.post(
      "https://github.com/login/oauth/access_token",
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code
        },
        headers: {
          Accept: "application/json"
        }
      }
    );
    const { access_token } = accessTokenResponse.data;
    const userResponse = await import_axios.default.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    const userSchema = import_zod2.z.object({
      id: import_zod2.z.number(),
      login: import_zod2.z.string(),
      name: import_zod2.z.string(),
      avatar_url: import_zod2.z.string().url()
    });
    const userInfo = userSchema.parse(userResponse.data);
    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id
      }
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url
        }
      });
    }
    const token = app2.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl
      },
      {
        sub: user.id,
        expiresIn: "30 days"
      }
    );
    return {
      token
    };
  });
}

// src/routes/upload.ts
var import_node_crypto = require("crypto");
var import_node_path = require("path");
var import_node_fs = require("fs");
var import_node_stream = require("stream");
var import_node_util = require("util");
var pump = (0, import_node_util.promisify)(import_node_stream.pipeline);
async function uploadRoutes(app2) {
  app2.post("/upload", async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5242880
        // 5mb
      }
    });
    if (!upload) {
      return reply.status(400).send();
    }
    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/;
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype);
    if (!isValidFileFormat) {
      return reply.status(400).send();
    }
    const fileId = (0, import_node_crypto.randomUUID)();
    const extension = (0, import_node_path.extname)(upload.filename);
    const fileName = fileId.concat(extension);
    const writeStream = (0, import_node_fs.createWriteStream)(
      (0, import_node_path.resolve)(__dirname, "../../uploads", fileName)
    );
    await pump(upload.file, writeStream);
    const fullUrl = request.protocol.concat("://").concat(request.hostname);
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();
    return fileUrl;
  });
}

// src/server.ts
var import_node_path2 = require("path");
var app = (0, import_fastify.default)();
app.register(import_multipart.default);
app.register(require("@fastify/static"), {
  root: (0, import_node_path2.resolve)(__dirname, "../uploads"),
  prefix: "/uploads"
});
app.register(import_cors.default, {
  origin: true
});
app.register(import_jwt.default, {
  secret: "spacetime"
});
app.register(memoriesRoutes);
app.register(authRoutes);
app.register(uploadRoutes);
app.listen({
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
  host: "0.0.0.0"
}).then(() => {
  console.log("\u{1F355} HTTP server running");
});
