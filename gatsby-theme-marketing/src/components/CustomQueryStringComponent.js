import React from "react";
import PropTypes from "prop-types";
import withLocation from "../withLocation";
import ExploreSpec from "./ExploreSpec";

const CustomQueryStringComponent = ({ search, isMobile }) => {
  const { tag, category } = search
  return <ExploreSpec tag={tag} category={category} isMobile={isMobile} />
}

CustomQueryStringComponent.propTypes = {
  search: PropTypes.object,
}

export default withLocation(CustomQueryStringComponent)