import axios from "axios";

export const createPost = async (req, res) => {
    const url = req.body.url;
    const tweetId = url.split("/").pop();
    let response;

    const config = {
        headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
    };

    try {
        response = await axios.get(
            `https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id&tweet.fields=created_at&user.fields=created_at`,
            config
        );
        res.json(response.data);
    } catch (error) {
        res.json({ type: "Twitter Error", error: error });
    }

    
};
