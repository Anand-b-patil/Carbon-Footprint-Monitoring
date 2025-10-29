package com.nutrino.carbonfootprint.domain.repository

import com.nutrino.carbonfootprint.data.remote.users.CreateUserRequest
import com.nutrino.carbonfootprint.data.remote.users.UserResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import kotlinx.coroutines.flow.Flow

interface UsersRepository {
    suspend fun createUser(userRequest: CreateUserRequest): Flow<ResultState<UserResponse>>
    suspend fun getUsers(): Flow<ResultState<List<UserResponse>>>
}
