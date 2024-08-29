import { NextApiRequest, NextApiResponse } from 'next';
import satori from 'satori';
import sharp from 'sharp';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;

    try {
        const response = await fetch(`http://localhost:3000/api/frame?userId=${userId}`);
        const svg = await response.text();
        const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

        res.setHeader('Content-Type', 'image/png');
        res.status(200).send(pngBuffer);
    } catch (error) {
        console.error("Error converting image:", error);
        res.status(500).json({ error: "Error converting image" });
    }
}