package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.data.remote.users.CreateUserRequest
import com.nutrino.carbonfootprint.data.remote.users.UserResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.UsersRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class CreateUserUseCase @Inject constructor(
    private val usersRepository: UsersRepository
) {
    suspend operator fun invoke(userRequest: CreateUserRequest): Flow<ResultState<UserResponse>> {
        return usersRepository.createUser(userRequest)
    }
}

class GetUsersUseCase @Inject constructor(
    private val usersRepository: UsersRepository
) {
    suspend operator fun invoke(): Flow<ResultState<List<UserResponse>>> {
        return usersRepository.getUsers()
    }
}
