import { lucia } from "lucia";
import { astro } from "lucia/middleware";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";
import postgres from "postgres";

const sql = postgres("postgres://manjaro_os_user:GQIs9bn2sory2wyalpCt5ejrGHFkJasy@dpg-cl5u9p472pts73b5eda0-a.oregon-postgres.render.com:5432/manjaro_os", {
    ssl: true
});

export const auth = lucia({
	adapter: postgresAdapter(sql, {
		user: "auth_user",
		key: "user_key",
		session: "user_session"
	}),
    middleware: astro(),
   env: import.meta.env.DEV ? "DEV":"PROD",

    getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

export type Auth = typeof auth;