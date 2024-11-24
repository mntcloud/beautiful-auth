
export async function fetch(resource: string | Request) {
  if (resource instanceof Request) {
    if (resource.url != "http://localhost:5173/auth") {
      return new Response(null, {
        status: 404,
        statusText: "not found"
      });
    }

    if (resource.method != "POST" && resource.headers.get("Content-Type") != "application/json") {
      return new Response(null, {
        status: 403,
        statusText: "access forbidden"
      });
    }

    const payload = await resource.json();

    if (payload["username"] != "moss@reynholm.co" && payload["password"] != "01189999") {
      return new Response(null, {
        status: 403,
        statusText: "access forbidden"
      })
    }

    return new Response(null, {
      status: 200,
      statusText: "Access Granted",
    });
  } else {
    return new Response(null, {
      status: 404,
      statusText: "not found",
    })
  }
}