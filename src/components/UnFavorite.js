import React, {PureComponent} from 'react';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class UnFavorite extends PureComponent {
  render() {
    return (
        <FontAwesomeIcon size="2x" icon={faHeart} />
    );
  }
}