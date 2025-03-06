const verifyEmailTemplate = ({ name, url }) => {
    return `<p>Dear ${name}</p>
      <p>Thank you for registering in blinkit</p>
      <a href=${url} style="color:white;background:blue;margin.top:10px">verify Email</a>`;
};

export default verifyEmailTemplate;
