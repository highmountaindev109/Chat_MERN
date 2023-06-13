import { useState } from 'react';

const useRooms = () => {
    const [rooms, setRooms] = useState(false);

    return { rooms, setRooms };
};

export default useRooms;
