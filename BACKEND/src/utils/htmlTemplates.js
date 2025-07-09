export const expiredLinkTemplate = () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Link Expired</title>
      <style>
        body {
          background-color: #0d1b2a;
          color: #e0e1dd;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          text-align: center;
          padding: 30px;
          background-color: #1b263b;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.4);
        }
        h1 {
          color: #ff6b6b;
          font-size: 2rem;
          margin-bottom: 10px;
        }
        p {
          font-size: 1rem;
          color: #c9d1d9;
        }
        a {
          color: #4cc9f0;
          text-decoration: none;
          margin-top: 20px;
          display: inline-block;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>⚠️ Link Expired</h1>
        <p>This link is no longer valid. It may have expired or already been used.</p>
        <a href="https://shrinkly-beta.vercel.app">Return to Shrinkly</a>
      </div>
    </body>
    </html>
  `;
};
