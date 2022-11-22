import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import React, { useContext} from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { StockContext } from "../context/StockContext";
import { useNavigate } from "react-router-dom";
import Cw from "../assets/cw.jpeg"

const FirmCard = ({ item, handleEdit }) => {
  const [editVisible, setEditVisible] = React.useState(false);
  const { delFirm } = useContext(StockContext);
  const navigate = useNavigate();

  const handleClick = (id) => {
    delFirm(id, navigate);
  };

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        minWidth:300,
        maxWidth:300,
        minHeight:500,
        maxHeight:500,
      }}
      onMouseOver={() => setEditVisible(true)}
      onMouseOut={() => setEditVisible(false)}
    >
      <CardHeader
        
        title={item.name}
        subheader={item.address}
      />
      <CardMedia
        component="img"
        image={item.image ? item.image : Cw }
        sx={{objectFit:"cover"}}
        alt={item.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {item.phone}
        </Typography>
      </CardContent>
      <React.Fragment>
        {editVisible && (
          <Typography component="p" variant="h6">
            <EditIcon
              onClick={() => handleEdit(item)}
              sx={{ cursor: "pointer" }}
            />{" "}
            <DeleteOutlineIcon
              onClick={() => handleClick(item.id)}
              sx={{ cursor: "pointer" }}
            />
          </Typography>
        )}
      </React.Fragment>
    </Card>
  );
};

export default FirmCard;
