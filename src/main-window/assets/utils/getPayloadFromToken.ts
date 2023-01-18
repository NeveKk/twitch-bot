const getPayloadFromToken = (token: string) => {
    const decodedPayload = Buffer.from(token.split('.')[1], 'base64').toString();

    return JSON.parse(decodedPayload);
};

export default getPayloadFromToken;
