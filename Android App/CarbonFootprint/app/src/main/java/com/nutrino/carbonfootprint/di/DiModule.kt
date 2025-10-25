package com.nutrino.carbonfootprint.di

import android.content.Context
import com.nutrino.carbonfootprint.data.local.UserPrefrence
import com.nutrino.carbonfootprint.data.repoImpl.AuthRepositoryImpl
import com.nutrino.carbonfootprint.domain.repository.AuthRepository
import com.nutrino.carbonfootprint.domain.usecase.SignUpUseCase
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DiModule {

    @Provides
    @Singleton
    fun provideKtorClient(): HttpClient{
        val client = HttpClient(CIO){
            install(ContentNegotiation){
                json(Json{
                    ignoreUnknownKeys=true
                    isLenient = true
                    prettyPrint=true
                })
            }


        }
        return client
    }

    @Provides
    fun contextObj(@ApplicationContext context: Context): Context{
        return context

    }

    @Provides
    fun userPrefrenceObj(@ApplicationContext context: Context): UserPrefrence {
        return UserPrefrence(context)
    }

    @Provides
    fun provideAutjRepo(userPrefrence: UserPrefrence, httpClient: HttpClient): AuthRepository{
        return AuthRepositoryImpl(
            userPrefrence = userPrefrence,
            httpClient = httpClient
        )
    }

    //USECASE
    @Provides
    fun provideSignUpUseCase(authRepository: AuthRepository): SignUpUseCase{
        return SignUpUseCase(authRepository = authRepository)
    }

}