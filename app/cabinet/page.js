import CabinetClient from "./CabinetClient";

export default async function CabinetPage({ searchParams }) {
  const params = await searchParams;
  const role = params?.role || "community";

  return <CabinetClient role={role} />;
}
