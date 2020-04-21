import React from "react";
import ListBody from "../components/ListBody";

export default function (props) {
  const { cards, setCards, navigation } = props;
  return (
    <ListBody
      searchTags={[]}
      navigation={navigation}
      category={{ name: "Show All", tags: [], icon: 'list', iconColor: '#2164ff' }}
      cards={cards}
      setCards={setCards}
    />
  );
}
