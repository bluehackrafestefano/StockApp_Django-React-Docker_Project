import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { StockContext } from "../../context/StockContext";
import { useNavigate } from "react-router-dom";
import cW from "../../assets/cw.jpeg"

const BrandCard = ({ item, handleEdit }) => {
  const [editVisible, setEditVisible] = React.useState(false);
  const { delBrand } = useContext(StockContext);
  const navigate = useNavigate();

  const handleClick = (id) => {
    delBrand(id, navigate);
  };

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        minWidth: 300,
        maxWidth: 300,
        minHeight: 400,
        maxHeight: 400,
      }}
      onMouseOver={() => setEditVisible(true)}
      onMouseOut={() => setEditVisible(false)}
    >
      <CardHeader title={item.name} />
      <CardMedia
        component="img"
        height="325"
        width="250"
        sx={{ padding: 2,objectFit:"cover"}}
        image={item.image !== null ? item.image : cW}
        alt={item.name}
        title={item.name}
      />
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

export default BrandCard;
