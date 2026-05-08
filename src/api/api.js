import instance from "../utils/service";

export async function analytics() {
  try {
    const res = await instance.get("/api/analytics");
    return { success: true, data: res.data };
  } catch (err) {
    console.log('err: ', err);
    return {
      success: false,
      message: err?.response?.message || "Error fetching analytics",
    };
  }
}
