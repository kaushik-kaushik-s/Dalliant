const hereco = async (url) => {
    const cohereApiKey = 'uOojAENFsI7Pr6AzK1OP0j8xLPgGR8x0k2yIBhxR';
    const cohereEndpointUrl = 'https://api.cohere.ai/classify';

    const cohereReq = {
        model: 'fb532845-9e54-40cb-bdfa-20ab37c36ef5-ft',
        inputs: [url]
    };

    const reqBody = JSON.stringify(cohereReq);

    const response = await fetch(cohereEndpointUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${cohereApiKey}`,
            'Content-Type': 'application/json'
        },
        body: reqBody
    });

    const responseBody = await response.json();
    return responseBody.classifications[0].prediction;
};

const blockedGenres = ["Shopping"];

window.addEventListener('load', async () => {
    const url = window.location.href;
    const genre = await hereco(url);
    if (blockedGenres.includes(genre)) {
        document.querySelector('body').innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #881fe1; z-index: 999999;">
        <p style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 66px; font-weight: bold; color: #fff; text-align: center;">
          The website is blocked!
        </p>
      </div>
    `;
    }
});
