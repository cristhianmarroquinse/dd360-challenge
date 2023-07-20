import Main from "@/components/Main";

const getData = async () => {
  const res = await fetch('https://gitlab.com/d2945/words/-/raw/main/words.txt')
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.text().then((text) => {
    return text.split('\n').filter((word) => word.length === 5)
  })
}

const HomePage: React.FC = async () => {
  const data = await getData()
  return <Main words={data}/>
};
  
export default HomePage;