const HEADER_DESCRIPTIONS = {
  // Caching
  age: 'The time in seconds the object has been in a proxy cache.',
  'cache-control': 'Specifies directives for caching mechanisms in both, requests and responses.',
  expires: 'The date/time after which the response is considered stale.',
  pragma:
    'Implementation-specific header that may have various effects anywhere along the request-response chain. Used for backwards compatibility with HTTP/1.0 caches where the Cache-Control header is not yet present.',
  warning: 'A general warning field containing information about possible problems.',
  //Conditionals
  'last-modified':
    'It is a validator, the last modification date of the resource, used to compare several versions of the same resource. It is less accurate than ETag, but easier to calculate in some environments. Conditional requests using If-Modified-Since and If-Unmodified-Since use this value to change the behavior of the request.',
  etag: 'It is a validator, a unique string identifying the version of the resource. Conditional requests using If-Match and If-None-Match use this value to change the behavior of the request.',
  'if-match':
    'Makes the request conditional and applies the method only if the stored resource matches one of the given ETags.',
  'if-none-match':
    "Makes the request conditional and applies the method only if the stored resource doesn't match any of the given ETags. This is used to update caches (for safe requests), or to prevent to upload a new resource when one is already existing.",
  'if-modified-since':
    'Makes the request conditional and expects the entity to be transmitted only if it has been modified after the given date. This is used to transmit data only when the cache is out of date.',
  'if-unmodified-since':
    'Makes the request conditional and expects the entity to be transmitted only if it has not been modified after the given date. This is used to ensure the coherence of a new fragment of a specific range with previous ones, or to implement an optimistic concurrency control system when modifying existing documents.',
  // Connection management
  connection:
    'Controls whether or not the network connection stays open after the current transaction finishes.',
  'keep-alive': 'Controls how long a persistent connection should stay open.',
  // Content negotiation
  accept: 'Informs the server about the types of data that can be sent back. It is MIME-type.',
  'accept-charset':
    'Informs the server about which character set the client is able to understand.',
  'accept-encoding':
    'Informs the server about the encoding algorithm, usually a compression algorithm, that can be used on the resource sent back.',
  'accept-language':
    'Informs the server about the language the server is expected to send back. This is a hint and is not necessarily under the full control of the user: the server should always pay attention not to override an explicit user choice (like selecting a language in a drop down list).',
  // Content security policy (CSP)
  'content-security-policy':
    'Controls resources the user agent is allowed to load for a given page.',
  'content-security-policy-report-only':
    'Allows web developers to experiment with policies by monitoring (but not enforcing) their effects. These violation reports consist of JSON documents sent via an HTTP POST request to the specified URI.',
  // Cookies
  cookie: 'Contains stored HTTP cookies previously sent by the server with the Set-Cookie header.',
  'set-cookie': 'Send cookies from the server to the user agent.',
  cookie2:
    'Used to contain an HTTP cookie, previously sent by the server with the Set-Cookie2 header, but has been obsoleted by the specification. Use Cookie instead.',
  'set-cookie2':
    'Used to send cookies from the server to the user agent, but has been obsoleted by the specification. Use Set-Cookie instead.',
  // CORS
  'access-control-allow-origin': 'Indicates whether the response can be shared.',
  'access-control-allows-credentials':
    'Indicates whether or not the response to the request can be exposed when the credentials flag is true.',
  'access-control-allow-headers':
    'Used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.',
  'access-control-allow-methods':
    'Specifies the method or methods allowed when accessing the resource in response to a preflight request.',
  'access-control-expose-headers':
    'Indicates which headers can be exposed as part of the response by listing their names.',
  'access-control-max-age': 'Indicates how long the results of a preflight request can be cached.',
  'access-control-request-headers':
    'Used when issuing a preflight request to let the server know which HTTP headers will be used when the actual request is made.',
  'access-control-request-method':
    'Used when issuing a preflight request to let the server know which HTTP method will be used when the actual request is made.',
  origin: 'Indicates where a fetch originates from.',
  // Do Not Track
  dnt: "Used for expressing the user's tracking preference.",
  tk: 'Indicates the tracking status that applied to the corresponding request.',
  // Downloads
  'content-disposition':
    "Is a response header if the ressource transmitted should be displayed inline (default behavior when the header is not present), or it should be handled like a download and the browser should present a 'Save As' window.",
  // HSTS
  'strict-transport-security': 'Force communication using HTTPS instead of HTTP.',
  // Message body information
  'content-length':
    'indicates the size of the entity-body, in decimal number of octets, sent to the recipient.',
  'content-type': 'Indicates the media type of the resource.',
  'content-encoding': 'Used to specify the compression algorithm.',
  'content-language':
    "Describes the language(s) intended for the audience, so that it allows a user to differentiate according to the users' own preferred language.",
  'content-location': 'Indicates an alternate location for the returned data.',
  // Message routing
  via: 'Added by proxies, both forward and reverse proxies, and can appear in the request headers and the response headers.',
  // Redirects
  location: 'Indicates the URL to redirect a page to.',
  // Request context
  from: 'Contains an Internet email address for a human user who controls the requesting user agent.',
  host: 'Specifies the domain name of the server (for virtual hosting), and (optionally) the TCP port number on which the server is listening.',
  referer:
    'The address of the previous web page from which a link to the currently requested page was followed.',
  'referrer-policy':
    'Governs which referrer information sent in the Referer header should be included with requests made.',
  'user-agent':
    'Contains a characteristic string that allows the network protocol peers to identify the application type, operating system, software vendor or software version of the requesting software user agent. See also the Firefox user agent string reference.',
  // Response context
  server:
    'Contains information about the software used by the origin server to handle the request.',
  // Range requests
  'accept-range':
    'Indicates if the server supports range requests and, if so, in which unit the range can be expressed.',
  'if-range':
    'Create a conditional range request that is only fulfilled if the etag or date given in parameter match the remote resource. Used to prevent downloading two ranges from incompatible version of the resource.',
  // Transfer coding
  'transfer-encoding':
    'Specifies the the form of encoding used to safely transfer the entity to the user.',
  te: 'Specifies the transfer encodings the user agent is willing to accept.',
  trailer: 'Allows the sender to include additional fields at the end of chunked message.',
  // Other
  date: 'Contains the date and time at which the message was originated.',
  'retry-after': 'Indicates how long the user agent should wait before making a follow-up request.',
  upgrade:
    'This is a Proposed Internet Standard. To view a comprehensive list of all Official and Proposed Internet Standards with detailed information about each, visit this Internet Standards reference, which is updated daily.  The relevant RFC document for the Upgrade header field standard is RFC 7230, section 6.7.  The standard establishes rules for upgrading or changing to a different protocol on the current client, server, transport protocol connection.  For example, this header standard allows a client to change from HTTP 1.1 to HTTP 2.0, assuming the server decides to acknowledge and implement the Upgrade header field.  Niether party is required to accept the terms specified in the Upgrade header field.  It can be used in both client and server headers.  If the Upgrade header field is specified, then the sender MUST also send the Connection header field with the upgrade option specified.  For details on the Connection header field please see section 6.1 of the aforementioned RFC.',
  vary: 'Determines how to match future request headers to decide whether a cached response can be used rather than requesting a fresh one from the origin server.',
  'x-content-type-options':
    'Disables MIME sniffing and forces browser to use the type given in Content-Type.',
  'x-dns-prefetch-control':
    'Controls DNS prefetching, a feature by which browsers proactively perform domain name resolution on both links that the user may choose to follow as well as URLs for items referenced by the document, including images, CSS, JavaScript, and so forth.',
  'x-frame-options':
    'Indicates whether or not a browser should be allowed to render a page in a <frame>, <iframe> or <object>',
}
