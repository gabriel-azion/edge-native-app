import { Router } from "itty-router";
import { useQuery, useExecute } from "azion/sql";

export const ApiRouter = () => {
  const router = Router({ base: "/api" });
  router.get("/posts", apiGetAllPostsHandler);
  router.post("/posts", apiCreatePostHandler);

  return router;
};


const apiGetAllPostsHandler = async (request, extras) => {
  const result = await useQuery(503, ["SELECT * FROM people"], true);

  const rows = result.rows || [];

  let results = JSON.stringify({ results: rows || [] });
  console.log(JSON.stringify({ results: rows || [] }));
  console.log(results);

  return new Response(JSON.stringify({ results: rows || [] }), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    status: 200,
  });
};



const apiCreatePostHandler = async (request, extras) => {
  try {
    const body = await request.json();
    const name = body.post;

    await useExecute(503, [`insert into people (name) values ('${name}')`]);

    return new Response(JSON.stringify({ message: "success" }), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "error" }), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      status: 500,
    });
  }
};
