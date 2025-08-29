import React from "react";
import { Container, Stack, Box } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retriveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/data/types/member";

/** REDUX SELECTOR */
const topUsersRetriever = createSelector(
  retriveTopUsers,
  (topUsers) => topUsers // faqat array qaytarish
);

export default function ActiveUsers() {
  const topUsers = useSelector(topUsersRetriever);

  // Agar selector undefined bo'lsa, bo'sh array ishlatamiz
  const topUsersArray: Member[] = Array.isArray(topUsers) ? topUsers : [];

  return (
    <div className={"active-users-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Active Users</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {topUsersArray.length !== 0 ? (
                topUsersArray.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                  return (
                    <Card
                      key={member._id}
                      variant="outlined"
                      className={"card"}
                    >
                      <CardOverflow>
                        <AspectRatio ratio={"1"}>
                          <img src={imagePath} alt={member.memberNick} />
                        </AspectRatio>
                      </CardOverflow>
                      <CardOverflow variant="soft" className={"member-detail"}>
                        <Typography className={"member-nickname"}>
                          {member.memberNick}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
