import { Card, Typography } from "antd";
const ChannelCard = (props) => {
  const { image, title } = props;
  return (
    <Card style={{ marginTop: "20px" }}>
      <img src={image} alt="channel-logo" />
      <Typography className="channel-card-heading">{title}</Typography>
    </Card>
  );
};

export default ChannelCard;
