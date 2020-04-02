import React from "react";
import PropTypes from "prop-types";
import withLocation from "../withLocation";
import ExploreSpec from "./ExploreSpec";

const CustomQueryStringComponent = ({ search, isMobile }) => {
  const { tag } = search
  return <ExploreSpec tag={tag} isMobile={isMobile} />
}

CustomQueryStringComponent.propTypes = {
  search: PropTypes.object,
}

export default withLocation(CustomQueryStringComponent)