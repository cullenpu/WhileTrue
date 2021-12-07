import React from 'react';
import { render, screen } from '@testing-library/react';
import { Profile } from '../pages';
import { initialUser, UserContext } from '../lib/UserContext';
import { MagicUserMetadata } from '@magic-sdk/types';

const user = initialUser;
const TEST_EMAIL = 'test@test.com';
const setUser = (user: MagicUserMetadata) => console.warn('no user provider');
user.email = TEST_EMAIL;


describe("Test Profile Page", () => {
    test('renders welcome message', () => {
        render(
            <UserContext.Provider value={{user, setUser}}>
                <Profile />
            </UserContext.Provider>
        );
        expect(screen.getByText(`Welcome ${TEST_EMAIL}.`)).toBeInTheDocument();
    });
});