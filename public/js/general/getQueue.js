export default async function getQueue(path) {
  const preresult = await fetch(`/${path}`);
  const result = await preresult.json();

  return result;
}
