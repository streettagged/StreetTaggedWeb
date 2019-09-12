import React, {PureComponent} from 'react';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Favorite extends PureComponent {
  render() {
    return (
        <FontAwesomeIcon size="2x" icon={faHeart} />
    );
  }
}