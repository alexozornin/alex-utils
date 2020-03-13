'use strict'

module.exports = {
    TIME: {
        MS_IN_SECOND: 1000,
        MS_IN_MINUTE: 60000,
        MS_IN_HOUR: 3600000,
        MS_IN_DAY: 86400000,
        MS_IN_WEEK: 604800000,
        SECONDS_IN_MINUTE: 60,
        SECONDS_IN_HOUR: 3600,
        SECONDS_IN_DAY: 86400,
        SECONDS_IN_WEEK: 604800,
        MINUTES_IN_HOUR: 60,
        MINUTES_IN_DAY: 1440,
        MINUTES_IN_WEEK: 10080,
        HOURS_IN_DAY: 24,
        HOURS_IN_WEEK: 168,
        DAYS_IN_WEEK: 7
    },
    HTTP_STATUS: {
        INFORMATIONAL: {
            CONTINUE: {
                CODE: 100,
                MESSAGE: `Continue`
            },
            SWITCHING_PROTOCOLS: {
                CODE: 101,
                MESSAGE: `Switching Protocols`
            },
            PROCESSING: {
                CODE: 102,
                MESSAGE: `Processing`
            },
            EARLY_HINTS: {
                CODE: 103,
                MESSAGE: `Early Hints`
            }
        },
        SUCCESS: {
            OK: {
                CODE: 200,
                MESSAGE: `OK`
            },
            CREATED: {
                CODE: 201,
                MESSAGE: `Created`
            },
            ACCEPTED: {
                CODE: 202,
                MESSAGE: `Accepted`
            },
            NON_AUTHORITATIVE_INFORMATION: {
                CODE: 203,
                MESSAGE: `Non-Authoritative Information`
            },
            NO_CONTENT: {
                CODE: 204,
                MESSAGE: `No Content`
            },
            RESET_CONTENT: {
                CODE: 205,
                MESSAGE: `Reset Content`
            },
            PARTIAL_CONTENT: {
                CODE: 206,
                MESSAGE: `Partial Content`
            },
            MULTI_STATUS: {
                CODE: 207,
                MESSAGE: `Multi-Status`
            },
            ALREADY_REPORTED: {
                CODE: 208,
                MESSAGE: `Already Reported`
            },
            IM_USED: {
                CODE: 226,
                MESSAGE: `IM Used`
            }
        },
        REDIRECTION: {
            MULTIPLE_CHOICES: {
                CODE: 300,
                MESSAGE: `Multiple Choices`
            },
            MOVED_PERMANENTLY: {
                CODE: 301,
                MESSAGE: `Moved Permanently`
            },
            FOUND: {
                CODE: 302,
                MESSAGE: `Found`
            },
            SEE_OTHER: {
                CODE: 303,
                MESSAGE: `See Other`
            },
            NOT_MODIFIED: {
                CODE: 304,
                MESSAGE: `Not Modified`
            },
            USE_PROXY: {
                CODE: 305,
                MESSAGE: `Use Proxy`
            },
            SWITCH_PROXY: {
                CODE: 306,
                MESSAGE: `Switch Proxy`
            },
            TEMPORARY_REDIRECT: {
                CODE: 307,
                MESSAGE: `Temporary Redirect`
            },
            PERMANENT_REDIRECT: {
                CODE: 308,
                MESSAGE: `Permanent Redirect`
            },
        },
        CLIENT_ERROR: {
            BAD_REQUEST: {
                CODE: 400,
                MESSAGE: `Bad request`
            },
            UNAUTHORIZED: {
                CODE: 401,
                MESSAGE: `Unauthorized`
            },
            PAYMENT_REQUIRED: {
                CODE: 402,
                MESSAGE: `Payment Required`
            },
            FORBIDDEN: {
                CODE: 403,
                MESSAGE: `Forbidden`
            },
            NOT_FOUND: {
                CODE: 404,
                MESSAGE: `Not Found`
            },
            METHOD_NOT_ALLOWED: {
                CODE: 405,
                MESSAGE: `Method Not Allowed`
            },
            NOT_ACCEPTABLE: {
                CODE: 406,
                MESSAGE: `Not Acceptable`
            },
            PROXY_AUTHENTICATION_REQUIRED: {
                CODE: 407,
                MESSAGE: `Proxy Authentication Required`
            },
            REQUEST_TIMEOUT: {
                CODE: 408,
                MESSAGE: `Request Timeout`
            },
            CONFLICT: {
                CODE: 409,
                MESSAGE: `Conflict`
            },
            GONE: {
                CODE: 410,
                MESSAGE: `Gone`
            },
            LENGTH_REQUIRED: {
                CODE: 411,
                MESSAGE: `Length Required`
            },
            PRECONDITION_FAILED: {
                CODE: 412,
                MESSAGE: `Precondition Failed`
            },
            PAYLOAD_TOO_LARGE: {
                CODE: 413,
                MESSAGE: `Payload Too Large`
            },
            URI_TOO_LONG: {
                CODE: 414,
                MESSAGE: `URI Too Long`
            },
            UNSUPPORTED_MEDIA_TYPE: {
                CODE: 415,
                MESSAGE: `Unsupported Media Type`
            },
            RANGE_NOT_SATISFIABLE: {
                CODE: 416,
                MESSAGE: `Range Not Satisfiable`
            },
            EXPECTATION_FAILED: {
                CODE: 417,
                MESSAGE: `Expectation Failed`
            },
            I_AM_A_TEAPOT: {
                CODE: 418,
                MESSAGE: `I'm a teapot`
            },
            MISDIRECTED_REQUEST: {
                CODE: 421,
                MESSAGE: `Misdirected Request`
            },
            UNPROCESSABLE_ENTITY: {
                CODE: 422,
                MESSAGE: `Unprocessable Entity`
            },
            LOCKED: {
                CODE: 423,
                MESSAGE: `Locked`
            },
            FAILED_DEPENDENCY: {
                CODE: 424,
                MESSAGE: `Failed Dependency`
            },
            TOO_EARLY: {
                CODE: 425,
                MESSAGE: `Too Early`
            },
            UPGRADE_REQUIRED: {
                CODE: 426,
                MESSAGE: `Upgrade Required`
            },
            PRECONDITION_REQUIRED: {
                CODE: 428,
                MESSAGE: `Precondition Required`
            },
            TOO_MANY_REQUESTS: {
                CODE: 429,
                MESSAGE: `Too Many Requests`
            },
            REQUEST_HEADER_FIELDS_TOO_LARGE: {
                CODE: 431,
                MESSAGE: `Request Header Fields Too Large`
            },
            UNAVAILABLE_FOR_LEGAL_REASONS: {
                CODE: 451,
                MESSAGE: `Unavailable For Legal Reasons`
            }
        },
        SERVER_ERROR: {
            INTERNAL_SERVER_ERROR: {
                CODE: 500,
                MESSAGE: `Internal server error`
            },
            NOT_IMPLEMENTED: {
                CODE: 501,
                MESSAGE: `Not Implemented`
            },
            BAD_GATEWAY: {
                CODE: 502,
                MESSAGE: `Bad Gateway`
            },
            SERVICE_UNAVAILABLE: {
                CODE: 503,
                MESSAGE: `Service Unavailable`
            },
            GATEWAY_TIMEOUT: {
                CODE: 504,
                MESSAGE: `Gateway Timeout`
            },
            HTTP_VERSION_NOT_SUPPORTED: {
                CODE: 505,
                MESSAGE: `HTTP Version Not Supported`
            },
            VARIANT_ALSO_NEGOTIATES: {
                CODE: 506,
                MESSAGE: `Variant Also Negotiates`
            },
            INSUFFICIENT_STORAGE: {
                CODE: 507,
                MESSAGE: `Insufficient Storage`
            },
            LOOP_DETECTED: {
                CODE: 508,
                MESSAGE: `Loop Detected`
            },
            NOT_EXTENDED: {
                CODE: 510,
                MESSAGE: `Not Extended`
            },
            NETWORK_AUTHENTICATION_REQUIRED: {
                CODE: 511,
                MESSAGE: `Network Authentication Required`
            },
        }
    }
};
