package com.nutrino.carbonfootprint.data.local

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.nutrino.carbonfootprint.constants.Constants
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import javax.inject.Inject

private val Context.dataStore by preferencesDataStore("token_store")
class UserPrefrence @Inject constructor(private val context: Context){
    private val access_token = stringPreferencesKey(Constants.ACCESS_TOKEN)
    val acessToken:Flow<String> = context.dataStore.data.map {
        it[access_token] ?: ""
    }

    suspend fun updateAcessToken(token: String){
        context.dataStore.edit {
            it[access_token] = token
        }
    }


}