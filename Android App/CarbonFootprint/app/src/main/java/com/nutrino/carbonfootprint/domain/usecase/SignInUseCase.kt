package com.nutrino.carbonfootprint.domain.usecase

import com.nutrino.carbonfootprint.data.remote.auth.SignInRequest
import com.nutrino.carbonfootprint.data.remote.auth.SignInResponse
import com.nutrino.carbonfootprint.data.state.ResultState
import com.nutrino.carbonfootprint.domain.repository.AuthRepository
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class SignInUseCase @Inject constructor(
    private val authRepository: AuthRepository
) {
    suspend operator fun invoke(signInRequest: SignInRequest): Flow<ResultState<SignInResponse>> {
        return authRepository.signIn(signInRequest = signInRequest)
    }
}
