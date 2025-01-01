import { client } from '@/sanity/lib/client';
import Image from 'next/image';

export default async function About() {

const data = await client.fetch(`*[_type == "post"]`)
    return (
        <div>
            <h1>About</h1>
            <p>This is the about page</p>
            {
        data.map((item: any) => {
            return (
                <div key={item._id}>
                    <h1>{item.title}</h1>
                    <h3>{item.subtitle}</h3>
                    <p>{item.description}</p>
                    <Image src={item.imageUrl} alt={item.title} width={350} height={200} />
                </div>
            )})
        }
        </div>
    )
}