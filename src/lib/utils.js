export async function getJSON(url, errorMsg = "Something Went Wrong") {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (errorMsg) {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  }
}
