import { NextResponse } from "next/server";

const key = JSON.parse(process.env.BITTE_KEY || "{}");

if (!key?.accountId) {
  console.error("no account");
}

export async function GET() {
  const pluginData = {
    openapi: "3.0.0",
    info: {
      title: "Dapp Radar",
      description: "API for the Dapp Radar Agent",
      version: "1.0.0",
    },
    servers: [
      {
        url: 'https://dapp-radar-agent.vercel.app',
      },
    ],
    "x-mb": {
      "account-id": key.accountId,
      assistant: {
        name: "Dapp Radar",
        description: "Dapp Radar Assistant",
        instructions: "You answer with a list of dapps per blockchain.",
        image: "https://avatars.githubusercontent.com/u/48711064?s=280&v=4",
        tools: [{ type: "generate-transaction" }],
      },
    },
    paths: {
      "/api/tools/dapp-radar": {
        get: {
          summary: "get blockchain dapps information",
          description: "Respond with a list of dapps according to the blockchain chain",
          operationId: "getChainDapps",
          parameters: [
            {
                name: "chain",
                in: "query",
                description: "Name of the chain",
                required: true,
                schema: {
                    type: "string"
                }
            }],
            responses: {
              "200": {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        success: {
                          type: "boolean",
                          description: "Status of response",
                        },
                        results: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              dappId: {
                                type: "integer",
                                description: "Unique identifier for the dapp",
                              },
                              name: {
                                type: "string",
                                description: "Name of the dapp",
                              },
                              description: {
                                type: "string",
                                description: "Short description of the dapp",
                              },
                              fullDescription: {
                                type: "string",
                                description: "Detailed description of the dapp",
                              },
                              logo: {
                                type: "string",
                                description: "URL to the dapp's logo",
                              },
                              link: {
                                type: "string",
                                description: "Link to the dapp on DappRadar",
                              },
                              website: {
                                type: "string",
                                description: "Official website of the dapp",
                              },
                              chains: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                                description: "Blockchains the dapp is available on",
                              },
                              categories: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                                description: "Categories the dapp belongs to",
                              },
                              socialLinks: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    title: {
                                      type: "string",
                                      description: "Title of the social link",
                                    },
                                    url: {
                                      type: "string",
                                      description: "URL of the social link",
                                    },
                                    type: {
                                      type: "string",
                                      description: "Type of the social link",
                                    },
                                  },
                                },
                                description: "Social media links related to the dapp",
                              },
                              tags: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "integer",
                                      description: "Tag identifier",
                                    },
                                    name: {
                                      type: "string",
                                      description: "Name of the tag",
                                    },
                                    slug: {
                                      type: "string",
                                      description: "Slug of the tag",
                                    },
                                  },
                                },
                                description: "Tags associated with the dapp",
                              },
                            },
                          },
                        },
                        page: {
                          type: "integer",
                          description: "Current page",
                        },
                        pageCount: {
                          type: "integer",
                          description: "Total amount of pages",
                        },
                        resultCount: {
                          type: "integer",
                          description: "Total amount of results",
                        },
                        resultsPerPage: {
                          type: "integer",
                          description: "Number of results per page",
                        },
                      },
                    },
                  },
                },
              },
            },
        },
      },
    },
  };

  return NextResponse.json(pluginData);
}
