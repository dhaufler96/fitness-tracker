export const API = "https://fitnestrac-kr.herokuapp.com/api";

export async function getActivities() {
  try {
    const response = await fetch(API + "/activities");

    if (!response.ok) {
      throw Error("Could not get activities");
    }

    return await response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await fetch(API + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function deleteActivity(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete an activity.");
  }

  const response = await fetch(API + "/activities/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw Error("You are not authorized to delete this activity.");
  }
}
