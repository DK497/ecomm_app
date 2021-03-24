import styled, { css } from 'styled-components';


// we are creating component TouchableOpacity with name EasyButton
// and we are definin default styles that come with it
// <EasyButton primary>
// for different props passed we will have additional styling
// associated with it

const EasyButton = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 3px;
    padding: 10px;
    margin: 5px;
    justify-content: center;
    background: transparent;

    ${(props) =>
        props.primary &&
        css`
            background: #5cb85c;
        `
    }

    ${(props) =>
        props.secondary &&
        css`
            background: #62b1f6
        `
    }

    ${(props) => 
        props.danger &&
        css`
            background: #f40105
        `
    }

    ${(props) => 
        props.darkg &&
        css`
            background: #006400
        `
    }

    ${(props) => 
        props.large &&
        css`
            width: 135px
        `
    }

    ${(props) => 
        props.medium &&
        css`
            width: 100px
        `
    }

    ${(props) => 
        props.small &&
        css`
            width: 60px
        `
    }
`;

export default EasyButton;

