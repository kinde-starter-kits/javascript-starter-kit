import "./style.css";
import {createKindeBrowserClient} from "@kinde-oss/kinde-typescript-sdk";

const loggedInViews = document.getElementsByClassName("js-logged-in-view");
const loggedOutViews = document.getElementsByClassName("js-logged-out-view");

const switchViews = (a, b) => {
  [...a].forEach((v) => v.removeAttribute("hidden"));
  [...b].forEach((v) => v.setAttribute("hidden", true));
};

const renderLoggedInView = (user) => {
  const namePlaceholder = document.querySelector(".js-user-name");
  const avatarPlaceholder = document.querySelector(".js-user-avatar");
  const avatarPicturePlaceholder = document.querySelector(
    ".js-user-avatar-picture"
  );
  namePlaceholder.textContent = `${user.given_name} ${user?.family_name || ""}`;

  if (`${user.picture}` != "") {
    avatarPicturePlaceholder.src = `${user.picture}`;
    avatarPicturePlaceholder.removeAttribute("hidden");
  } else {
    avatarPlaceholder.textContent = `${user.given_name[0]}${
      user?.family_name?.[0] || user.given_name[1]
    }`;
    avatarPlaceholder.removeAttribute("hidden");
  }

  switchViews(loggedInViews, loggedOutViews);
};

const renderLoggedOutView = () => {
  const loggedInViews = document.getElementsByClassName("js-logged-in-view");
  const loggedOutViews = document.getElementsByClassName("js-logged-out-view");
  switchViews(loggedOutViews, loggedInViews);
};

const render = async (user) => {
  if (user) {
    renderLoggedInView(user);
  } else {
    renderLoggedOutView();
  }
};

const kinde = createKindeBrowserClient({
  clientId: import.meta.env.VITE_KINDE_CLIENT_ID,
  authDomain: import.meta.env.VITE_KINDE_DOMAIN,
  redirectURL: import.meta.env.VITE_KINDE_REDIRECT_URL,
  logoutRedirectURL: import.meta.env.VITE_KINDE_REDIRECT_URL,
});

const q = new URLSearchParams(window.location.search);
if (q.has('code')) {
  await kinde.handleRedirectToApp(new URL(window.location.toString()));
  history.replaceState(null, "", import.meta.env.VITE_KINDE_REDIRECT_URL);
} else {
  try {
    await kinde.refreshTokens();
  } catch {}
}

const addKindeEvent = (id) => {
  document.getElementById(id).addEventListener("click", async () => {
    window.location = await kinde[id]();
  });
};

["login", "register", "logout"].forEach(addKindeEvent);

// Handle page load
const user = await kinde.getUser();
await render(user);
